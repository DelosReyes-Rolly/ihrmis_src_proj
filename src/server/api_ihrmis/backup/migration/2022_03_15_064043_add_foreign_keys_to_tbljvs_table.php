<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTbljvsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbljvs', function (Blueprint $table) {
            $table->foreign('jvs_itm_id', 'tbljvs_ibfk_1')->references('itm_id')->on('tblplantilla_items')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbljvs', function (Blueprint $table) {
            $table->dropForeign('tbljvs_ibfk_1');
        });
    }
}
