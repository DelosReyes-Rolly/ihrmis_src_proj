<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountRequest;
use App\Http\Resources\AccountRequestConfirmation;
use App\Http\Resources\CommonResource;
use App\Models\AccountRequestModel;
use App\Models\Tbloffices;
use Illuminate\Http\Request;

class AccountRequestResource extends Controller
{
    public function checkCode(Request $request, $id)
    {
        $query = AccountRequestModel::where('acc_req_id', $id)->first();
        if ($query->acc_req_code == $request->code) {
            $query->acc_req_verified = 1;
            $query->save();
            return response()->json([
                "status" => "200",
                "message" => "Verified"
            ]);
        }
        return response()->json([
            "status" => "400",
            "message" => "Failed"
        ]);
    }

    public function getConfirmed($id)
    {
        return new AccountRequestConfirmation(
            AccountRequestModel::with('TblPositions', 'TblOffice')->where('acc_req_id', $id)->first()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = request()->except(['acc_req_id']);
        $result = array_filter($data);
        $result['acc_req_code'] = mt_rand(1000000, 9999999);
        // return $result;
        return new AccountRequest(AccountRequestModel::updateOrCreate(
            [
                'acc_req_id' => $request->acc_req_id,
            ],
            $result
        ));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new AccountRequest(
            AccountRequestModel::where('acc_req_id', $id)->first()
        );
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
