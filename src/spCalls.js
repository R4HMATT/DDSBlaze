import axios from 'axios';
import $ from 'jquery'; 

// function buildUrl(id) {
//     ye{item-id}/fields"
// }



let connect = require('./Connection.json');
var listitementitytype = connect.sharepoint.listitementitytype;

// takes current status and updates it to the inverse
// example if checkedIn is status, will make status on SP to change to notCheckedIn
// status: String
// id: String (numerical)
function updateStatus(status, id) {
    let newStatus = (status === 'NotCheckedIn') ? 'CheckedIn' : 'NotCheckedIn';


    let bearer = "Bearer " + localStorage.getItem("accessToken")

    let axiosSPUpdate = axios.create();
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("accessToken");

    //axios.defaults.headers.common['Content-Type'] = 'application/json;odata=verbose';
    axios.defaults.headers.common['Accept'] =  "application/json;odata=verbose";
    axios.defaults.headers.common['Origin'] = '';
    axios.defaults.headers.common['Method'] = 'POST';
    //let headers = {'X-RequestDigest': $('#__REQUESTDIGEST').val()};

    axios.defaults.headers.common['X-HTTP-Method'] =  'MERGE';
    axios.defaults.headers.common['X-RequestDigest'] = $('#__REQUESTDIGEST').val();

    
    // 'https://rahmnik.sharepoint.com/_api/contextinfo'
    // https://rahmnik.sharepoint.com/sites/ddsblazewfh/_api/contextinfo
    // https://rahmnik.sharepoint.com/_api/SP.AppContextSite(rahmnik)/contextinfo

    axios.post('https://rahmnik.sharepoint.com/sites/ddsblazewfh/_api/contextinfo',
    ).then(res => res.json()
    ).then(j => console.log(JSON.stringify(j)));
    // body: { '__metadata': { 'type': listitementitytype }, 'Title': 'TestUpdated'},
    // headers: {
    // Authorization: "Bearer " + localStorage.getItem('accessToken')
    // X-RequestDigest: form digest value
    // "IF-MATCH": "*"
    // "X-HTTP-Method":"MERGE",
    // 
    // content-type: "application/json;odata=verbose"
    // content-length:length of post body}
    // let headersObj = {
    //     "Authorization": "bearer" + localStorage.get("accessToken"),
    //     "Content-Type": 'application'
    // }"Field '__metadata' is not recognied",





    // console.log(localStorage.getItem("accessToken"));
    // axiosSPUpdate.patch(connect.sharepoint.update_list_address + id + "/fields", {
    //         'Status': newStatus,
    //         //'__Metadata': JSON.stringify({ 'type': "SP.Data.TestlistListItem" })
    //     })
    // .then(function(response) {
    //     console.log(response);
    //     console.log('sent successfully');
    // });
}

export default updateStatus;