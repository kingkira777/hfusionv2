const con = require('./connection');

let Options = {


    // INSURACE LIST
    insuranceList : () => {
        var xdata = [];
        var g = `SELECT * FROM insurance`;
        return new Promise(resolve => {
            con.query(g,(err,rs)=>{
                if(err) throw err;
                for(var i in rs){
                    var data = {}
                    data[rs[i].insurance_id] = rs[i].name;
                    xdata.push(data);
                }
                xdata = (xdata[0])? xdata[0] : [];
                resolve(xdata);
            });
        });
    },


    // STAFF LIST
    saffList : () => {
        var disciplineDataList = [];
        return new Promise(resolve => {
            var g = `SELECT a.staff_id, a.firstname, a.lastname, b.discipline FROM staff_information a 
            LEFT JOIN staff_professional_information b on a.staff_id = b.staff_id`;
            con.query(g,(err,rs)=>{
                if(err) throw err;
                for(var key in rs){
                    var data = {};
                    data[rs[key].staff_id] = rs[key].lastname+" "+rs[key].firstname+"("+rs[key].discipline.toUpperCase()+")";
                    disciplineDataList.push(data);
                }
                disciplineDataList = (disciplineDataList[0])? disciplineDataList[0] : [];
                resolve(disciplineDataList);
            });
        });
    },


    // ETHNICITY LIST
    ethnicityList : () => {
        var data = {
            'Afro American' : 'Afro American',
            'Caucasian' : 'Caucasian',
            'Far-East' : 'Far-East',
            'Hispanic' : 'Hispanic',
            'Middle Eastern' : 'Middle Eastern',
            'Non-Hispanic' : 'Non-Hispanic',
            'Pacific Islander' : 'Pacific Islander',
            'South Asian' : 'South Asian'
        };  
        return data;
    },

    // RACE 
    raceList : () => {
        var data = {
            A1000A : 'American Indian or Alaska Native',
            A1000B : 'Asian',
            A1000C : 'Black or African American',
            A1000D : 'Hispanic or Latino',
            A1000E : 'Native Hawaiian or Other Pacific Islander',
            A1000F : 'White',
        };  
        return data;
    },

    // DISEASE
    diseaseList : () => {
        var data = {
            01 : 'ALS',
            02 : 'Alzheimer\'s',
            03 : 'Autoimmune Disease',
            04 : 'Cancer',
            05 : 'Dementia',
            06 : 'Diabetes',
            07 : 'Digestive Disease',
            08 : 'FTT/Debility (Non-Specific Disease)',
            09 : 'Heart Disease',
            10 : 'HIV Disease',
            11 : 'Kidney Disease',
            12 : 'Liver Disease',
            13 : 'Neuro(CVA, MS, Parkinson\'s)',
            14 : 'Pulmonary Disease',
            15 : 'Renal Disease',
            16 : 'Stroke and Coma',
            17 : 'Other'
        };
        return data;
    },  

    //DISCIPLINE LIST 
    disciplineList : () => {
        var data = {
            admin : 'ADMIN',
            bc : 'BC',
            bsw : 'BSW',
            cm : 'CM',
            ha : 'HA',
            hm : 'HM',
            lcsw : 'LCSW',
            lvn : 'LVN',
            lvnha : 'LVN-HA',
            md : 'MD',
            mis : 'MIS',
            msw : 'MSW',
            np : 'NP',
            nu : 'NU',
            ot : 'OT',
            pa : 'PA',
            pcp : 'PCP',
            pharma : 'Pharm.D',
            pt : 'PT',
            qapi : 'QAPI',
            rn : 'RN',
            sc : 'SC',
            sn : 'SN',
            st : 'ST',
            vol : 'VOL',
        };
        return data;
    }
};


module.exports = Options;