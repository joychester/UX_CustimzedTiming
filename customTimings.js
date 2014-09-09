CustomLoadTiming = window.CustomLoadTiming || {};

CustomLoadTiming.getPerformanceResourceTiming = function(resName) {
    var array = performance.getEntriesByType("resource");
	
    console.log(resName);
    for(var i =0; i < array.length; i++) {
        var timingObj = array[i];
	    console.log(timingObj);
        if(timingObj.name.indexOf(resName) > 0) {
		  console.log("Found resource: " + timingObj.name);
		  return timingObj;
        }
    }
    return undefined;
}; 

CustomLoadTiming.fetchUxLoadTimeFromResource = function(resource) {
    var t = performance.timing;
    console.log("TTFB: " + (t.responseStart - t.navigationStart));
    var uxTargetPerformanceResourceTiming = CustomLoadTiming.getPerformanceResourceTiming(resource);
    CustomLoadTiming.uxLoadTime = (uxTargetPerformanceResourceTiming) ? uxTargetPerformanceResourceTiming.fetchStart : undefined;
    console.log("Perceived user performance time: " + Math.floor(CustomLoadTiming.uxLoadTime));
};