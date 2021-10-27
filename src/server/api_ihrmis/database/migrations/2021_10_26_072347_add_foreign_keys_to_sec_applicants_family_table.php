<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToSecApplicantsFamilyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysql2')->table('sec_applicants_family', function (Blueprint $table) {
            $table->foreign('app_id', 'sec_applicants_family_ibfk_1')->references('app_id')->on('sec_applicants_profile');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql2')->table('sec_applicants_family', function (Blueprint $table) {
            $table->dropForeign('sec_applicants_family_ibfk_1');
        });
    }
}
