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
            $table->timestamp('ref_app_timestamp')->useCurrent()->unique('ref_app_timestamp')->comment('Unique static identifier');
            $table->string('ref_app_email', 100)->comment('Email address of the reference.
Served as a secondary key for a
unique identification of records.');
            $table->string('ref_app_name', 150)->comment('Reference\'s full name.');
            $table->string('ref_app_addr')->comment('Reference\'s address.');
            $table->string('ref_app_tel_no', 50)->comment('Reference\'s telephone or contact number.');
            $table->dateTime('ref_bckgrnd_chk')->useCurrent()->comment('Date and time the reference
responded to background checking
of respective applicant.');
            $table->primary(['ref_app_id', 'ref_app_email']);
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
