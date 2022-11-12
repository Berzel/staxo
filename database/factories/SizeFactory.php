<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Size>
 */
class SizeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'url' => fake()->imageUrl(),
            'storage_path' => fake()->imageUrl(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function small()
    {
        $path = fake()->imageUrl(
            gray: true,
            width: 300,
            height: 300,
        );

        return $this->state(fn (array $attributes) => [
            'size' => 'sm',
            'storage_path' => $path,
            'url' => $path,
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function large()
    {
        $path = fake()->imageUrl(
            gray: true,
            width: 600,
            height: 600,
        );

        return $this->state(fn (array $attributes) => [
            'size' => 'lg',
            'storage_path' => $path,
            'url' => $path,
        ]);
    }
}
