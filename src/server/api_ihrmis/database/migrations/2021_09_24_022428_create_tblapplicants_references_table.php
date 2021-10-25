<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsReferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_references', function (Blueprint $table) {
            $table->unsignedInteger('ref_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('ref_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->string('ref_app_name', 150)->comment('Reference\'s full name.');
            $table->string('ref_app_addr')->comment('Reference\'s address.');
            $table->string('ref_app_tel_no', 50)->comment('Reference\'s telephone or contact number.');
            $table->primary(['ref_app_id', 'ref_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_references');
    }
}
