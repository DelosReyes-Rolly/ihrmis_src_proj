<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblapplicantsReferenceCheckTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblapplicants_reference_check', function (Blueprint $table) {
            $table->foreign(['chk_ref_id', 'chk_ref_email'], 'tblapplicants_reference_check_ibfk_1')->references(['ref_app_id', 'ref_app_email'])->on('tblapplicants_references')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblapplicants_reference_check', function (Blueprint $table) {
            $table->dropForeign('tblapplicants_reference_check_ibfk_1');
        });
    }
}
