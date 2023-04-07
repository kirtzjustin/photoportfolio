function toggleCluster() {
    try {
        if (app.clusterPointLayer.featureReduction === null) {
            app.clusterPointLayer.featureReduction = app.clusterPointLayer_clusterSettings
 
            app.clusterPointLayerOverview.featureReduction = {
                type: 'cluster',
                clusterRadius: "60",
                popupTemplate: null
            }
        } else {
            app.clusterPointLayer.featureReduction = null;
            app.clusterPointLayerOverview.featureReduction = null;
        }
 
    } catch (e) {
        console.log('Error Clustering toggle', e.message)
    }
}