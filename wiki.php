<?php
$wiki_articles = scandir('wiki');
$wiki = array();
foreach($wiki_articles as $wiki_article){
    if(strpos($wiki_article, '.md') == false){
        continue;
    }
    $wiki[] = array(
        'file' => $wiki_article,
    );
}
echo json_encode($wiki);
