<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Image;
use App\Models\Product;
use App\Models\Size;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Artisan::call('migrate:fresh');

        User::factory()->count(mt_rand(15, 30))
            ->has(Product::factory()->count(mt_rand(0, 5))
                ->has(Image::factory()
                    ->has(Size::factory()->small())
                    ->has(Size::factory()->large())
                )
            )
        ->create();
    }
}
