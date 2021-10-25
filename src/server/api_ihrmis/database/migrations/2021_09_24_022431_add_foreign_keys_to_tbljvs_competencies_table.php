<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTbljvsCompetenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbljvs_competencies', function (Blueprint $table) {
            $table->foreign('com_jvs_id', 'tbljvs_competencies_ibfk_1')->references('jvs_id')->on('tbljvs')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbljvs_competencies', function (Blueprint $table) {
            $table->dropForeign('tbljvs_competencies_ibfk_1');
        });
    }
}
