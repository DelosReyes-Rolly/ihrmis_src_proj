<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblnotificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblnotification', function (Blueprint $table) {
            $table->integer('noti_id', true)->comment('tbl_notification indentifier');
            $table->string('noti_title')->comment('Title of the notification');
            $table->text('noti_message')->comment('Message of the notfication');
            $table->tinyInteger('noti_read')->comment('Mark as read: true for read, false for not yeat open.');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblnotification');
    }
}
