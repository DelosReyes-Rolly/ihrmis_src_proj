<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblplantillaItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblplantilla_items', function (Blueprint $table) {
            $table->increments('itm_id')->comment('Plantilla Item ID. A unique identification of records.');
            $table->unsignedTinyInteger('itm_regular')->comment('Indicator if the position is regular. [0-No, 1-Yes].');
            $table->string('itm_no', 30)->comment('Plantilla Item number.');
            $table->unsignedInteger('itm_pos_id')->index('itm_pos_id')->comment('Position ID. Identifies the position being referenced.');
            $table->unsignedInteger('itm_ofc_id')->comment('Office ID. Identifies the office being referenced.');
            $table->unsignedTinyInteger('itm_status')->comment('Employment or appointment status as defined by CSC. [0-Permanent, 1-Provisional, 2-Temporary, 3-Substitute, 4-Coterminous, 5-Casual, 6-Contractual, 7-Job Order].');
            $table->unsignedTinyInteger('itm_basis')->comment('Agreed term of time to perform task. [0-Full-Time, 1-Part-Time].');
            $table->unsignedTinyInteger('itm_category')->comment('Category of a civil service position. Non-regular positions are considered non-career service. [0-Career, 1-Non-Career].');
            $table->unsignedTinyInteger('itm_level')->comment('Level of position in civil service. [0-Key, 1-Technical, 2-Support to Technical, 3-Administrative].');
            $table->string('itm_function')->comment('Description of position function.');
            $table->unsignedTinyInteger('itm_creation')->comment('Mode the position was created. [0-Original, 1-Rationalization Plan].');
            $table->unsignedInteger('itm_source')->index('itm_source')->comment('Source of fund. Basis of compensation.');
            $table->unsignedInteger('itm_supv1_itm_id')->index('itm_supv1_itm_id')->comment('Position of immediate supervisor.');
            $table->unsignedInteger('itm_supv2_itm_id')->index('itm_supv2_itm_id')->comment('Position of next higher supervisor.');
            $table->unsignedTinyInteger('itm_state')->comment('Define the state of the plantilla position. [0-Filled, 1-
Vacant, 2-Process/Close, 3-Open, 4-Pending, 5-
Remove].');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblplantilla_items');
    }
}
