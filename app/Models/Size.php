<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'size',
        'storage_path',
        'url'
    ];

    /**
     * Get the image that owns this image size
     *
     * @return void
     */
    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
