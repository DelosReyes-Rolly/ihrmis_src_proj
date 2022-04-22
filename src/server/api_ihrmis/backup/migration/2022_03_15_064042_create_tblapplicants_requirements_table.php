<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsRequirementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_requirements', function (Blueprint $table) {
            $table->unsignedInteger('req_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->unsignedInteger('req_app_doc_id')->comment('Document Id. Identifies the specific type of document being referred to.');
            $table->string('req_app_file')->nullable()->comment('Name of the document file uploaded including the path where it is located.');
            $table->primary(['req_app_id', 'req_app_doc_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_requirements');
    }
}
