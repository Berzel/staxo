<?php

namespace App\Models;

use App\Jobs\OptimizeProductImage;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'price',
    ];

    /**
     * Get the user who owns this product
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product images
     */
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function name() : Attribute
    {
        return Attribute::make(
            set: fn ($value) => [
                'name' => $value,
                'slug' => $this->slug ?? Str::slug($value) . '-' . now()->timestamp
            ]
        );
    }

    public function addImage(UploadedFile $uploadedImage)
    {
        $image = $this->images()->create();

        $path = $uploadedImage->storePubliclyAs(
            $this->imageDirectory(),
            'default'.'.'.strtolower($uploadedImage->extension()),
            'public'
        );

        $image->sizes()->create([
            'size' => 'default',
            'storage_path' => $path,
            'url' => Storage::url($path),
        ]);

        OptimizeProductImage::dispatch($image);

        return $image;
    }

    public function updateImage(UploadedFile $uploadedImage)
    {
        $image = $this->images()->first();

        $path = $uploadedImage->storePubliclyAs(
            $this->imageDirectory(),
            'default'.'.'.strtolower($uploadedImage->extension()),
            'public'
        );

        $image->default->update([
            'storage_path' => $path,
            'url' => Storage::url($path),
        ]);

        OptimizeProductImage::dispatch($image);

        return $image;
    }


    public function deleteImage()
    {
        $this->images->each(function ($image) {
            
            $image->sizes->each(function ($size) {
                Storage::disk('public')->delete($size->storage_path);
                $size->delete();
            });

            $image->delete();
        });
    }

    protected function imageDirectory()
    {
        return $this->created_at->format('Y/m/d') . '/' . $this->id;
    }
}
