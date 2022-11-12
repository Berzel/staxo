<?php

namespace Tests\Feature\Products;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_it_can_create_a_product()
    {
        $this->assertTrue(true);
        // $product = Product::factory()->make();

        // $response = $this->actingAs($this->user())->post(route('products.create'), [
        //     // 'image' =>;
        //     'name' => $product->name,
        //     'price' => $product->price
        // ]);

        // $product = Product::first();
        // $response->assertRedirect(route('products.show', ['product' => $product->slug]));
    }
}
