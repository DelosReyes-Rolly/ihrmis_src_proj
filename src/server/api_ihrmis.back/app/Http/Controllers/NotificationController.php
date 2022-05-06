<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Tblnotification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotification() {
        $query = Tblnotification::orderBy('created_at', 'DESC')->paginate(10);
        return NotificationResource::collection($query);
    }

    public function markAsReadNotification($id) {
        $query = Tblnotification::find($id);
        $query->noti_read = 1;
        $query->save();
    }
}
