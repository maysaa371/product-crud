<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController; // Import the ProductsController

// Route to get the authenticated user
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API Routes for Products
Route::apiResource('products', ProductsController::class);
// Create a new product
// api.php
Route::get('/test', function () {
    return 'API is working!';
});

