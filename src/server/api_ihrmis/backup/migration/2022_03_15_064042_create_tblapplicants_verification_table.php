<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsVerificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_verification', function (Blueprint $table) {
            $table->increments('vry_app_id')->comment('sec_applicanst_profile table id which is app_id');
            $table->string('vry_app_token', 64)->unique('token')->comment('Generated token upon submitting user information');
            $table->timestamp('vry_app_timestamp')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_verification');
    }
}
