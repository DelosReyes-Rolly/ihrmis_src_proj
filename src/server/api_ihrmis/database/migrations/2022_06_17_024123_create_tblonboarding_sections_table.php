<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblonboardingSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblonboarding_sections', function (Blueprint $table) {
            $table->tinyIncrements('sec_onb_id')->comment('Onboarding section ID. A unique identification of records.');
            $table->unsignedTinyInteger('sec_onb_order')->comment('Sequence order in the list.');
            $table->string('sec_onb_name', 150)->comment('Name of the section.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblonboarding_sections');
    }
}
