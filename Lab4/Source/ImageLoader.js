/**
 * Created by Esha Mayuri on 7/2/2017.
 */

function ImageLoader()
{
    this.images = [];
    this.imagesLoaded = 0;
    this.isGameReady = false;
    this.onReadyCallback = function() { throw new Error("Not ready"); };
    this.onProgressCallback = function()
    {
        var res;
        if(this.images.length > 0)
            res = this.imagesLoaded / this.images.length
        else
            res = 0;

        return res;
    };
    this.onLoaded = function() {
        this.loader.imagesLoaded++;
        if(this.loader.imagesLoaded == this.loader.images.length)
        {
            this.loader.isGameReady = true;
            this.loader.onReadyCallback();
        }
    };
    this.addingImage = function (src, name) {
        var img 	= new Image();
        img.loader	= this;
        this.images.push( {image:img, source:src, imgName:name} );
    };
    this.getImage_index = function(index) {
        return this.images[index].image;
    }
    this.loadingImages = function() {
        for(var i = 0, len = this.images.length; i < len; i++)
        {
            this.images[i].image.src = this.images[i].source;
            this.images[i].image.onload = this.onLoaded;
            this.images[i].image.name = this.images[i].imgName;
        }
    }
}