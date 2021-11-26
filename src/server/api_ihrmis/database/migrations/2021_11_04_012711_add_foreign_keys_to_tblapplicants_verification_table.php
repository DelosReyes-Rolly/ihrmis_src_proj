<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblapplicantsVerificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblapplicants_verification', function (Blueprint $table) {
            $table->foreign('vry_app_id', 'tblapplicants_verification_ibfk_1')->references('app_id')->on('tblapplicants_profile');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblapplicants_verification', function (Blueprint $table) {
            $table->dropForeign('tblapplicants_verification_ibfk_1');
        });
    }
}
