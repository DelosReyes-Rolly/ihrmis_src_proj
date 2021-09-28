<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblapplicantsVoluntaryWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblapplicants_voluntary_works', function (Blueprint $table) {
            $table->foreign('vol_app_id', 'tblapplicants_voluntary_works_ibfk_1')->references('app_id')->on('tblapplicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblapplicants_voluntary_works', function (Blueprint $table) {
            $table->dropForeign('tblapplicants_voluntary_works_ibfk_1');
        });
    }
}
