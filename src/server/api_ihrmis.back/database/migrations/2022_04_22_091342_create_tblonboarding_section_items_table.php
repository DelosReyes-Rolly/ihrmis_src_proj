<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblonboardingSectionItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblonboarding_section_items', function (Blueprint $table) {
            $table->increments('itm_onb_id')->comment('Onboarding section item ID. A unique identification of records.');
            $table->unsignedTinyInteger('itm_sec_onb_id')->index('itm_sec_onb_id')->comment('Onboarding section ID. Identifies the related onboarding section.');
            $table->string('itm_onb_name', 150)->comment('Name of the section item that describes its content.');
            $table->string('itm_onb_url')->comment('URL address that links the section to the official website page, if any.');
            $table->text('itm_onb_content')->comment('Content of the section item as written and formatted from a text editor.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblonboarding_section_items');
    }
}
