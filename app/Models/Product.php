<?php

namespace App\Models;

use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function addImage(UploadedFile $image)
    {
        // $image = $this->images()->create();
    }
}
