<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'party_logo'
    ];

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }
}
