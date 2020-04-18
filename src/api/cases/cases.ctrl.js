data = [
    {
        id:'1',
        writer:{
            username:'minwoo',
            speciality:'student'
        },
        categories:['Dermatology','Family Medicine'],
        images:['https://app.figure1.com/image/display?urlToken=5e9a331409f6079100214db1&imageSize=9','https://app.figure1.com/image/display?urlToken=5e9a331661062188003853c2&imageSize=9'],
        caseText:'0 yr old man.\
        Presents with redness at neck (see images), forearm, upper back. Mild itching. Warm to touch. Appears to be raised areas like skin tags present.\
        Medical history:\
        Myasthenia Gravis (IVIg 5 weeks ago)\
        COPD (well controlled)\
        TCC bladder neck (conservative management, regular Cystoscopy and cautery).\
        Psoriasis (extensive).\
        Steroid dependent.\
        \
        Takes: Mestinon, Amlodipine, Deltacortil, Imuran, and inhalers daily.\
        \
        No new medications. Completed POAB for UTI two weeks ago.\
        \
        Any ideas what this could be?',
        likes:10,
        views:200,
        comments:[
            {
                id:'1',
                writer:{
                    username:'DrMo-UC',
                    speciality:'Primary Care',
                },
                likes:10,
                comment:'A herpetic or zoster rash would be on my list. Less likely fungal. Paraneoplastic ... maybe.',
                reply:[]
            },
            {
                id:'2',
                writer:{
                    username:'mahtab1982',
                    speciality:'Dermatology',
                },
                likes:10,
                comment:'This could be a lot of things. A photosensitivity reaction related to his drugs (amlodipine). Eczematous reaction induced by IgIV (happens during the first weeks / months of therapy). Subacute lupus (can happen also in case of thymoma-associated myasthenia : any CT scan performed since the diagnosis of myasthenia?). And why not, paraneoplastic dermatomyositis.',
                reply:[]
            }
        ]
    },
    {
        id:'2',
        writer:{
            username:'CincyKidsRad',
            speciality:'Radiology and Nuclear Medicine'
        },
        categories:['Radiology','Pediotrics'],
        images:['https://app.figure1.com/image/display?urlToken=5e99f747343612bb0095d161&imageSize=9','https://app.figure1.com/image/display?urlToken=5e99f7469b532ba900ca0519&imageSize=9'],
        caseText:'There are a number of findings of hip dysplasia in this patient. On the AP radiograph (image 1) we can draw a number of lines that help us to confirm the diagnosis. First, we draw a horizontal line (called Hillgenreiner’s line) connecting the triradiate cartilage. We then draw a line perpendicular to Hillgenreiner’s line (called Perkin’s line) from the lateral margin of the acetabulum. The normal ossified femoral head should be in the lower inner quadrant like on the right side. Subluxed hips are in the upper outer quadrant. The acetabular angle (image 2) can be measured as the angle between Hillgenreiner’s line and the acetabulum. A normal acetabular angle is less than 28 degrees at birth. Finally, Shenton’s arc (image 3) can be drawn along the medial aspect of the femoral neck and the inferior aspect of the superior pubic ramus. Shenton’s arc should be a smooth arc and not have two apices like on the left hip. #FridayQuizDay #FridayQuiz',
        likes:10,
        views:200,
        comments:[
            {
                id:'1',
                writer:{
                    username:'Candlemaker',
                    speciality:'Chair, Dept. of Orthopedics on Figure 1',
                },
                likes:10,
                comment:'Nice',
                reply:[]
            }
        ]
    }
];


exports.getCaseList = ctx => {
    ctx.body = data;
};

exports.postImages = ctx => {
    const files = ctx.request.files.file;
    ctx.body = 'done';
};

exports.postCase = ctx => {
    const { writer, categories, images, caseText } = ctx.request.body;
    ctx.body = {
        writer,
        categories,
        images,
        caseText
    }
};

exports.updateCase = ctx => {
    const { id } = ctx.params;
    const { writer, cateogry } = ctx.request.body;
};

exports.removeCase = ctx => {
    const { id } = ctx.params;
};