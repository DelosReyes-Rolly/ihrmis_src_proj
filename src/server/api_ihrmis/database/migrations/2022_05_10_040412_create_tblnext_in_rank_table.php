<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblnextInRankTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblnext_in_rank', function (Blueprint $table) {
            $table->integer('nir_id', true)->comment('Next in rank list Identifier');
            $table->string('nir_name')->comment('Employee name');
            $table->string('nir_email')->comment('Employee office email');
            $table->string('nir_pos_title')->comment('Employee position title');
            $table->string('nir_office')->comment('Employee office');
            $table->integer('nir_itm_id')->comment('Next rank belongs to this plantilla identifier');
            $table->integer('nir_emp_id')->comment('Employee identifier of next in rank.');
            $table->integer('nir_agn_id')->comment('Employee agency identifier');
            $table->integer('nir_ofc_id')->comment('Employee office indentifier');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblnext_in_rank');
    }
}
