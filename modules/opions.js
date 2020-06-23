

let Options = {



    // Ethnicity 
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

    // Race 
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

    //Discipline List 
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