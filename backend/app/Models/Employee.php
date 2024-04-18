<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'tbl_karyawan'; // Adjust it to the table name you are using

    protected $fillable = [
        'name',
        'address',
        'position',
    ];

    // If you have 'created_at' and 'updated_at' columns in the table
    public $timestamps = true;

    // If you don't have 'created_at' and 'updated_at' columns in the table
    // public $timestamps = false;
}
