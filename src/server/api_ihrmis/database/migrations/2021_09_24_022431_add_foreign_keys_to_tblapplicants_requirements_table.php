<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblapplicantsRequirementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblapplicants_requirements', function (Blueprint $table) {
            $table->foreign('req_app_id', 'tblapplicants_requirements_ibfk_1')->references('app_id')->on('tblapplicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblapplicants_requirements', function (Blueprint $table) {
            $table->dropForeign('tblapplicants_requirements_ibfk_1');
        });
    }
}
