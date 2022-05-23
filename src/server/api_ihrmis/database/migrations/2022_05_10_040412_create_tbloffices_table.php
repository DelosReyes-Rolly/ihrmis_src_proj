<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblofficesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbloffices', function (Blueprint $table) {
            $table->increments('ofc_id')->comment('Office ID. A unique identification of records.');
            $table->char('ofc_type', 3)->comment('Type or category of office. (1-DOST CO, 2-DOST RO/PSTC, 3-DOST Attached Agency, 4-Constitutional Bodies, 5-NGA, 6-GOCC, 7-LGU, 8-SUC, 9-PUC, 10-NGO, 11-Private Agency, 12-Others)');
            $table->string('ofc_name')->comment('Name of office.');
            $table->string('ofc_acronym', 20)->comment('Short name or acronym.');
            $table->integer('ofc_agn_id')->comment('Agency identifier');
            $table->char('ofc_area_code', 3)->default('000')->comment('Area code refers to Regional Code based on geographical location of the position.');
            $table->char('ofc_area_type', 1)->default('R')->comment('Area type refers to the geographical location of the position in terms of: R-Region, P-Province, D-District, M-Municipality, or F-Foreign Post.');
            $table->unsignedInteger('ofc_head_itm_id')->comment('Plantilla position of the head of the office.');
            $table->unsignedInteger('ofc_oic_itm_id')->comment('Plantilla position of the current officer-in-charge of the office.');
            $table->unsignedInteger('ofc_ofc_id')->comment('Parent office ID.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbloffices');
    }
}
