<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_attachments', function (Blueprint $table) {
            $table->unsignedInteger('att_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('att_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->unsignedInteger('att_app_doc_id')->comment('Document Id. Identifies the specific type of document being referred to.');
            $table->string('att_app_name', 150)->comment('Desired name for the attached document for easy identification.');
            $table->string('att_app_file')->comment('Name of the document file uploaded including the directory path where it is located.');
            $table->primary(['att_app_id', 'att_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_attachments');
    }
}
