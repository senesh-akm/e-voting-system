<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'voter_id',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }
}
