<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblplantillaItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblplantilla_items', function (Blueprint $table) {
            $table->foreign('itm_supv1_itm_id', 'tblplantilla_items_ibfk_1')->references('itm_id')->on('tblplantilla_items')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('itm_supv2_itm_id', 'tblplantilla_items_ibfk_2')->references('itm_id')->on('tblplantilla_items')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('itm_source', 'tblplantilla_items_ibfk_3')->references('itm_id')->on('tblplantilla_items')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblplantilla_items', function (Blueprint $table) {
            $table->dropForeign('tblplantilla_items_ibfk_1');
            $table->dropForeign('tblplantilla_items_ibfk_2');
            $table->dropForeign('tblplantilla_items_ibfk_3');
        });
    }
}
