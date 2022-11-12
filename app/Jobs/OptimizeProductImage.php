<?php

namespace App\Jobs;

use App\Models\Image;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class OptimizeProductImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(
        private Image $image
    ) {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $sizes = ['sm' => 300, 'lg' => 600];

        collect($sizes)->each(function ($size, $sizeName) {
            $product = $this->image->product;
            $original = $this->image->default;

            $newPath = $product->created_at->format('Y/m/d').'/'.$product->id.'/'.$sizeName.'.webp';

            \Intervention\Image\Facades\Image::make(storage_path('app/public/'.$original->storage_path))
                ->encode('webp', 50)->save(storage_path('app/public/'.$newPath));

            \Spatie\Image\Image::load(storage_path('app/public/'.$newPath))
                ->fit(\Spatie\Image\Manipulations::FIT_MAX, $size, $size)
                ->optimize()
                ->save();

            $this->image->sizes()->create([
                'size' => $sizeName,
                'storage_path' => $newPath,
                'url' => Storage::url($newPath),
            ]);
        });
    }
}
