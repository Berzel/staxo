<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [

    ];

    /**
     * Get the product that owns this image
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the image sizes
     */
    public function sizes()
    {
        return $this->hasMany(Size::class);
    }

    public function default()
    {
        return $this->hasOne(Size::class)->ofMany([
            'id' => 'max',
        ], function (Builder $query) {
            $query->whereSize('default');
        });
    }
}
