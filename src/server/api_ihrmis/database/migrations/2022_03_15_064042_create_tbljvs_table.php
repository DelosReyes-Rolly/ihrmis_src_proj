<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbljvsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbljvs', function (Blueprint $table) {
            $table->increments('jvs_id')->comment('JVS ID. A unique identification of records.');
            $table->unsignedInteger('jvs_itm_id')->index('jvs_itm_id')->comment('Plantilla item ID. Identifies plantilla item being referenced.');
            $table->unsignedTinyInteger('jvs_version')->comment('Indicates the version number of the form.');
            $table->string('jvs_min_com_desc')->comment('Minimum qualification standards for job comptency.');
            $table->string('jvs_prepared')->comment('Name of the person who prepared the form, the date he/she signed and the signature file if opted to be saved, in the format "<name>|<date>|<filename>".');
            $table->text('jvs_approved')->comment('Name of the person who approved the form, the date he/she signed  and the signature file if opted to be saved, in the format "<name>|<date>|<filename>".');
            $table->string('jvs_signed_file')->comment('Name of the generated PDF file including the path where it is located.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbljvs');
    }
}
