<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblapplicantsOtherInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblapplicants_other_info', function (Blueprint $table) {
            $table->foreign('oth_app_id', 'tblapplicants_other_info_ibfk_1')->references('app_id')->on('tblapplicants_profile')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblapplicants_other_info', function (Blueprint $table) {
            $table->dropForeign('tblapplicants_other_info_ibfk_1');
        });
    }
}
