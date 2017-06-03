

// If not already defined ...
if ( !$.fn.tooltipX  )
{
  (function( $ ) {
    $.widget( "custom.tooltipX", $.ui.tooltip, {
      options: {
          autoShow: true,
          autoHide: true
      },
      _create: function() {
        this._super();
        if(!this.options.autoShow){
          this._off(this.element, "mouseover focusin");
        }
      },
      _open: function( event, target, content ) {
        this._superApply(arguments);

        if(!this.options.autoHide){
          this._off(target, "mouseleave focusout");
        }
      }
    });
  }( jQuery ) );
}
