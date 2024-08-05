<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Product; // Import the Product model
use Illuminate\Foundation\Testing\WithFaker; // Optional, for generating random data
use Illuminate\Support\Facades\Artisan; // For running artisan commands like database migrations

class ProductTest extends TestCase
{
    use RefreshDatabase, WithFaker; // Use WithFaker if you need random data

    protected function setUp(): void
    {
        parent::setUp();

        // Run the database migrations before each test
        Artisan::call('migrate');

        // Optionally, seed the database
        // Artisan::call('db:seed');
    }

    #[\PHPUnit\Framework\Attributes\Test] // Use PHPUnit 9+ attributes
    public function it_can_list_products(): void
    {
        // Use the Product factory to create test data
        Product::factory()->count(3)->create();

        // Make a GET request to the /api/products endpoint
        $response = $this->getJson('/api/products');

        // Assert that the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert that the response contains the expected number of products
        $response->assertJsonCount(3, 'data');
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_create_a_product(): void
    {
        // Define the product data
        $productData = [
            'name' => 'Product 1',
            'description' => 'Description 1',
            'price' => 99.99,
            'quantity' => 10,
        ];

        // Make a POST request to create a new product
        $response = $this->postJson('/api/products', $productData);

        // Assert that the response status is 201 (Created)
        $response->assertStatus(201);

        // Assert that the response JSON matches the product data
        $response->assertJsonFragment($productData);

        // Assert that the product exists in the database
        $this->assertDatabaseHas('products', $productData);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_show_a_product(): void
    {
        // Create a product using the factory
        $product = Product::factory()->create();
    
        // Make a GET request to the /api/products/{id} endpoint
        $response = $this->getJson('/api/products/' . $product->id);
    
        // Assert that the response status is 200 (OK)
        $response->assertStatus(200);
    
        // Assert that the response JSON matches the product details
        $response->assertJsonFragment([
            'name' => $product->name,
            'description' => $product->description,
            'price' => number_format($product->price, 2, '.', ''), // Ensure price is formatted as a string with 2 decimal places
            'quantity' => $product->quantity,
        ]);
    }
    

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_update_a_product(): void
    {
        // Create a product using the factory
        $product = Product::factory()->create();

        // Define the updated product data
        $updateData = [
            'name' => 'Updated Name',
            'description' => 'Updated Description',
            'price' => 49.99,
            'quantity' => 20,
        ];

        // Make a PUT request to the /api/products/{id} endpoint
        $response = $this->putJson('/api/products/' . $product->id, $updateData);

        // Assert that the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert that the response JSON matches the updated product data
        $response->assertJsonFragment($updateData);

        // Assert that the product has been updated in the database
        $this->assertDatabaseHas('products', $updateData);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_can_delete_a_product(): void
    {
        // Create a product using the factory
        $product = Product::factory()->create();

        // Make a DELETE request to the /api/products/{id} endpoint
        $response = $this->deleteJson('/api/products/' . $product->id);

        // Assert that the response status is 204 (No Content)
        $response->assertStatus(204);

        // Assert that the product no longer exists in the database
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }
}
