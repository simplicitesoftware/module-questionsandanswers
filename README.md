<!--
 ___ _            _ _    _ _    __
/ __(_)_ __  _ __| (_)__(_) |_ /_/
\__ \ | '  \| '_ \ | / _| |  _/ -_)
|___/_|_|_|_| .__/_|_\__|_|\__\___|
            |_| 
-->
![](https://docs.simplicite.io//logos/logo250.png)
* * *

`QuestionsAndAnswers` module definition
=======================================

### Introduction

This is a sample **Q&A** application (backend and frontend).

### Import

To import this module:

- Create a module named `QuestionsAndAnswers`
- Set the settings as:

```json
{
	"type": "git",
	"origin": {
		"uri": "https://github.com/simplicitesoftware/module-qa.git"
	}
}
```

- Click on the _Import module_ button

### Configure

In order to have the frontend working the password for the
webservices-only user `qa` must be `simplicite`.

This can be acheived by importing the following XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<simplicite xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.simplicite.fr/base" xsi:schemaLocation="http://www.simplicite.fr/base https://www.simplicite.io/resources/schemas/base.xsd">
<object>
	<name>UserPwd</name>
	<action>update</action>
	<data>
		<usr_login_read>qa</usr_login_read>
		<usr_password>simplicite</usr_password>
	</data>
</object>
</simplicite>
```

### Load data

Sample data is provided as a module's dataset.

Open this dataset and click on the _Apply_ button after having imported the module and made a full clear cache.

`QAQuestionAndAnswer` business object definition
------------------------------------------------

Question and answer

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      | 
| ------------------------------------------------------------ | ---------------------------------------- | -------- | --------- | -------- | -------------------------------------------------------------------------------- |
| `qaQaaSection` link to **`QASection`**                       | id                                       | yes*     |           |          | Section                                                                          |
| _Ref. `qaQaaSection.qaSecNumber`_                            | _char(20)_                               |          |           |          | _Section number_                                                                 |
| `qaQaaKeywords`                                              | multi(1000) using `QA_QAA_KEYWORDS` list |          |           |          | Keywords                                                                         |
| `qaQaaDate`                                                  | datetime                                 |          |           |          | Date                                                                             |
| `qaQaaQuestion`                                              | html(1000000)                            | yes*     |           |          | Question                                                                         |
| `qaQaaAnswer`                                                | html(1000000)                            | yes      | yes       |          | Answer                                                                           |
| `qaQaaDocument`                                              | document                                 |          | yes       |          | Document                                                                         |
| `qaQaaURL`                                                   | url(255)                                 |          | yes       |          | URL                                                                              |

### Lists

* `QA_QAA_KEYWORDS`
    - `KEYWORD1` Keyword 1
    - `KEYWORD2` Keyword 2
    - `KEYWORD3` Keyword 3

`QAQuestionAndAnswerHistoric` business object definition
--------------------------------------------------------



### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      | 
| ------------------------------------------------------------ | ---------------------------------------- | -------- | --------- | -------- | -------------------------------------------------------------------------------- |
| `row_ref_id` link to **`QAQuestionAndAnswer`**               | id                                       | yes*     |           |          | -                                                                                |
| `row_idx`                                                    | int(11)                                  | yes*     | yes       |          | -                                                                                |
| `created_by_hist`                                            | char(100)                                | yes*     |           |          | -                                                                                |
| `created_dt_hist`                                            | datetime                                 | yes*     |           |          | -                                                                                |
| `qaQaaQuestion`                                              | html(1000000)                            | yes*     |           |          | Question                                                                         |
| `qaQaaAnswer`                                                | html(1000000)                            | yes      | yes       |          | Answer                                                                           |

`QASection` business object definition
--------------------------------------

Section

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      | 
| ------------------------------------------------------------ | ---------------------------------------- | -------- | --------- | -------- | -------------------------------------------------------------------------------- |
| `qaSecNumber`                                                | char(20)                                 | yes*     | yes       |          | Section number                                                                   |
| `qaSecParent` link to **`QASection`**                        | id                                       |          | yes       |          | Parent section                                                                   |
| _Ref. `qaSecParent.qaSecNumber`_                             | _char(20)_                               |          |           |          | _Section number_                                                                 |
| `qaSecTitle`                                                 | char(100)                                | yes      | yes       |          | Section title                                                                    |
| `qaSecDescription`                                           | html(1000000)                            |          | yes       |          | Description                                                                      |

`qa` external object definition
-------------------------------

Questions and answers frontend


