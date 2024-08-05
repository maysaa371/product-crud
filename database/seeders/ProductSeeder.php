<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Laptop',
            'description' => 'A high-performance laptop.',
            'price' => 999.99,
            'quantity' => 50,
        ]);

        Product::create([
            'name' => 'Smartphone',
            'description' => 'A latest model smartphone.',
            'price' => 699.99,
            'quantity' => 100,
        ]);

        Product::create([
            'name' => 'Headphones',
            'description' => 'Noise-cancelling headphones.',
            'price' => 199.99,
            'quantity' => 75,
        ]);
    }
}
