<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTbljvsCmptncyRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbljvs_cmptncy_ratings', function (Blueprint $table) {
            $table->foreign(['rtg_id', 'rtg_com_type'], 'tbljvs_competency_ratings_ibfk_1')->references(['com_jvs_id', 'com_type'])->on('tbljvs_competencies')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbljvs_cmptncy_ratings', function (Blueprint $table) {
            $table->dropForeign('tbljvs_competency_ratings_ibfk_1');
        });
    }
}
