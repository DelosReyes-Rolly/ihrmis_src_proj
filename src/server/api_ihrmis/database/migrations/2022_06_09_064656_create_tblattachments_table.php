<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblattachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblattachments', function (Blueprint $table) {
            $table->bigIncrements('att_id')->comment('Attachment ID. A unique identification of records.');
            $table->string('att_source', 150)->comment('Source to identify the entity or table that made an attachment. In the format "<table name>|<primary key>[|<2nd primary key>|...]".');
            $table->string('att_name', 150)->comment('Desired name for the attached document for easy identification.');
            $table->string('att_file')->comment('Name of the document file uploaded including the directory path where it is located.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblattachments');
    }
}
