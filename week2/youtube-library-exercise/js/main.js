
// console.log('youtube:', youtube);


const allLinkTags = document.querySelectorAll('a');

for (let i = 0; i < allLinkTags.length; i++) {
  const currentLink = allLinkTags[i];
  const thumbnailUrl = youtube.generateThumbnailUrl( currentLink.href );

  const newImgTag = document.createElement('img');
  newImgTag.src = thumbnailUrl;
  newImgTag.alt = "YouTube video thumbnail";

  // currentLink.appendChild( newImgTag );
}

// jQuery version:
// const $allLinkTags = $('a');

$('a').each( function(){
  // console.log(this.href);
  const currentLinkHref = $(this).attr('href');
  // console.log(currentLinkHref);

  const thumbnailUrl = youtube.generateThumbnailUrl( currentLinkHref );
  // console.log( thumbnailUrl );

  const $img = $('<img>');
  $img.attr({
    src: thumbnailUrl,
    alt: 'Youtube video thumbnail',
    // target: '_blank'
  });
  
  $img.appendTo( this );
  // $(this).append( $img );

  // $('a').attr('target', '_blank');


} );
