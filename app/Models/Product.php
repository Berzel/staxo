<?php

namespace App\Models;

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
}