<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSecApplicantVerificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysql2')->create('sec_applicant_verification', function (Blueprint $table) {
            $table->increments('id_sec_applicant')->comment('sec_applicanst_profile table id which is app_id');
            $table->string('token', 64)->unique('token')->comment('Generated token upon submitting user information');
            $table->timestamp('timestamp')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql2')->drop('sec_applicant_verification', function (Blueprint $table) {
            
            
            
        });
    }
}
