# jQuery plugin for bootstrap style framework - page pagination element

example
======

```
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript"
            src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" charset="UTF-8"></script>
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet"/>
    <script type="text/javascript"
            src="http://netdna.bootstrapcdn.com/twitter-bootstrap/3.3.1/js/bootstrap.min.js" charset="UTF-8"></script>
    <script type="text/javascript"
            src="https://github.com/bermud-ru/jquery.bootstrap.paginator/blob/master/build/jquery.bootstrap.paginator.min.js" charset="UTF-8"></script>
    <style>
        .im-centered { margin: auto; max-width:32em;}
    </style>
</head>
<body>
<div class="container">
    <div class="im-centered">
    <div class="row">
        <div class="page-selection"></div>
    </div>
   </div>
    <div class="jumbotron">Page #1</div>
    <div class="im-centered">
    <div class="row">
        <div class="page-selection"></div>
    </div>
    </div>
<script>
    $('.page-selection').bootstrapPaginator({
        page: 1,
        count: 50,
        ruler: 10,
        reload: function(page){
            $('.jumbotron').html('Page #'+page);
        }
    });
</script>
</div>
</body>
</html>
```