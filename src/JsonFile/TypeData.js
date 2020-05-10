module.exports = {
    
    "aggregateBy": [
        { 
            "dataTypeName": "com.google.heart_minutes"
        },
        {
            "dataTypeName":"com.google.step_count.delta",
            "dataSourceId":"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }, 
        {
            "dataTypeName":"com.google.activity.segment"
        },
        {
            "dataTypeName":"com.google.heart_rate.bpm"
        }
    ]
}