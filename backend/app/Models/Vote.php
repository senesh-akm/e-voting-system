<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'candidate_id',
        'election_id',
        'district',
        'constituency'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function election()
    {
        return $this->belongsTo(Election::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function constituency()
    {
        return $this->belongsTo(Constituency::class);
    }
}
